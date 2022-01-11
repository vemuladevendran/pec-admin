export const menuItems = [
    ['school', 'Teachers', ['/teachers']],
    ['people', 'STUDENT', ['/students']],
    ['subject', 'DEPARTMENT', ['/department']],
    ['summarize', 'ATTENDANCE-REPORT', ['attendance-report']],
    ['account_circle', 'Profile', ['/profile']],
].map(([icon, text, path]) => ({ icon, text, path }));