
export const encryptionUtils = {
    async getKey(password = 'community-worker-form-key-2025') {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
        );
        
        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: encoder.encode('community-worker-salt'),
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    },

    async encrypt(data) {
        try {
            const key = await this.getKey();
            const encoder = new TextEncoder();
            const iv = crypto.getRandomValues(new Uint8Array(12));
            
            const encryptedData = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                key,
                encoder.encode(JSON.stringify(data))
            );
            
            const combined = new Uint8Array(iv.length + encryptedData.byteLength);
            combined.set(iv);
            combined.set(new Uint8Array(encryptedData), iv.length);
            
            return btoa(String.fromCharCode(...combined));
        } catch (error) {
            console.error('Encryption error:', error);
            return null;
        }
    },

    async decrypt(encryptedStr) {
        try {
            const key = await this.getKey();
            const combined = Uint8Array.from(atob(encryptedStr), c => c.charCodeAt(0));
            const iv = combined.slice(0, 12);
            const encryptedData = combined.slice(12);
            
            const decryptedData = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                key,
                encryptedData
            );
            
            const decoder = new TextDecoder();
            return JSON.parse(decoder.decode(decryptedData));
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }
};