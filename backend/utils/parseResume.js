module.exports = function extractKeywords(text) {
    const roleKeywords = ['developer', 'engineer', 'designer', 'analyst', 'manager'];
    const matches = roleKeywords.filter(role => text.toLowerCase().includes(role));
    return matches.length > 0 ? matches : ['developer'];
};
