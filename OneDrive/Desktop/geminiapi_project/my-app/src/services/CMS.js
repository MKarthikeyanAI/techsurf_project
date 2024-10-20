export const fetchContentTypes = async () => {
    const response = await fetch('/api/content-types');
    const data = await response.json();
    return data;
};

export const createContentType = async (prompt) => {
    const response = await fetch('/generate-content-type', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data;
};
