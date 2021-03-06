export const menuItems = [
    ['school', 'Teachers', ['/teachers']],
    ['people', 'STUDENT', ['/students']],
    ['subject', 'DEPARTMENT', ['/department']],
    ['summarize', 'ATTENDANCE-REPORT', ['attendance-report']],
    ['summarize', 'Admins', ['admin']],
    ['account_circle', 'Profile', ['/profile']],
].map(([icon, text, path]) => ({ icon, text, path }));