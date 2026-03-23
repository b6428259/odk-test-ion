const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        
        // Environment variables injected by S2I or manually set
        const envData = {
            BUILD_REFERENCE: process.env.OPENSHIFT_BUILD_REFERENCE || 'Unknown (Manual/Local)',
            BUILD_COMMIT: process.env.OPENSHIFT_BUILD_COMMIT || 'Unknown',
            BUILD_NAMESPACE: process.env.OPENSHIFT_BUILD_NAMESPACE || 'Unknown',
            POD_NAME: process.env.HOSTNAME || 'Unknown',
            NODE_VERSION: process.version,
            CUSTOM_MESSAGE: process.env.CUSTOM_MESSAGE || 'Deployed successfully! Customize this message in environment variables or code.'
        };

        let result = data;
        for (const [key, value] of Object.entries(envData)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            result = result.replace(regex, value);
        }

        res.send(result);
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
