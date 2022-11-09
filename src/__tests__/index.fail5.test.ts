/** ****************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Oct 25 2022
 *  File : index.test.ts
 ****************************************** */
import getVideoWatermarkFree from '..';

jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn((url) => {
        if (url === 'https://tikfast.net/en') {
            return Promise.resolve({
                headers: {
                    get: () => null,
                },
            });
        }
        if (url === 'https://tikfast.net/tik-download/download-link') {
            return Promise.reject(new Error('test'));
        }
        if (url === 'https://tikfast.net/tik-download/download') {
            return Promise.reject(new Error('test'));
        }
        return Promise.reject(new Error('test'));
    }) as jest.Mock,
);

beforeEach(() => {
    jest.clearAllMocks();
});

test('Fetching no-cookie error', async () => {
    const url = 'https://www.tiktok.com/@steuerfabi/video/7158115322103352582';
    return getVideoWatermarkFree(url).catch((error) => {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('No cookie found');
    });
});
