/**
 * FarmDirect Tamil Nadu — Universal Synchronous Authentication Guard
 * Evaluates synchronously in <head> before HTML/CSS renders to eliminate any flash of unauthenticated content.
 * Prevents unauthorized access and protects against browser Back/Forward Cache (bfcache) restoration after logout.
 */
(function () {
    function evaluateGuard() {
        try {
            var currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

            // Only authentication and offline pages are public. All site content requires sign-in.
            var publicPages = [
                'login.html',
                'register.html',
                'admin-login.html',
                'offline.html'
            ];

            if (publicPages.indexOf(currentPath) !== -1) {
                try { document.documentElement.style.visibility = ''; } catch(_) {}
                return; // Allow public browsing access
            }

            // 2. Evaluate Session and Local Credentials
            var sAuth = sessionStorage.getItem('fd_admin_authenticated') === 'true';
            var lAuth = localStorage.getItem('fd_admin_authenticated') === 'true';
            var sRole = (sessionStorage.getItem('fd_user_role') || '').toLowerCase();
            var lRole = (localStorage.getItem('fd_user_role') || '').toLowerCase();
            var isAdmin = (sAuth || lAuth) && (sRole === 'admin' || lRole === 'admin');

            var isUser = sessionStorage.getItem('fd_user_logged_in') === 'true' ||
                         localStorage.getItem('fd_user_logged_in') === 'true';

            var sName = (sessionStorage.getItem('fd_user_name') || '').trim();
            var lName = (localStorage.getItem('fd_user_name') || '').trim();
            var userName = sName || lName;

            var hasValidSession = (isAdmin || isUser) && userName && userName !== 'null' && userName !== 'undefined';

            // 3. Admin Command Pages: Restrict strictly to authenticated administrators
            var isAdminPage = currentPath.indexOf('admin-') === 0 || currentPath === 'reports.html';
            if (isAdminPage) {
                if (!isAdmin) {
                    try { document.documentElement.style.visibility = 'hidden'; } catch(_) {}
                    sessionStorage.setItem('fd_admin_redirect', currentPath);
                    window.location.replace('admin-login.html');
                    return;
                }
                try { document.documentElement.style.visibility = ''; } catch(_) {}
                return; // Authenticated admin allowed
            }

            // 4. Protected Participant Pages (Farmer, Consumer, Logistics, etc.)
            if (!hasValidSession) {
                try { document.documentElement.style.visibility = 'hidden'; } catch(_) {}
                if (currentPath !== 'index.html') {
                    sessionStorage.setItem('fd_login_redirect', currentPath);
                }
                window.location.replace('login.html');
                return;
            }
            try { document.documentElement.style.visibility = ''; } catch(_) {}
        } catch (e) {
            // Safe fallback in case of storage restrictions
            try { document.documentElement.style.visibility = 'hidden'; } catch(_) {}
            window.location.replace('login.html');
        }
    }

    // Run synchronously on immediate script load
    evaluateGuard();

    // Prevent access via browser Back/Forward Cache (BFCache) after user logs out
    window.addEventListener('pageshow', function (event) {
        evaluateGuard();
    });

    window.addEventListener('popstate', function () {
        evaluateGuard();
    });
})();
