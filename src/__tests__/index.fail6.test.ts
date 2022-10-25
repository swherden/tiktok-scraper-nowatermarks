/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Tue Oct 25 2022
 *  File : index.test.ts
 *******************************************/
import getVideoWatermarkFree from '..';

jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn((url) => {
        if (url === 'https://tikfast.net/en') {
            return Promise.reject(new Error('test'));
        } else if (url === 'https://tikfast.net/tik-download/download-link') {
            return Promise.reject(new Error('test'));
        } else if (url === 'https://tikfast.net/tik-download/download') {
            return Promise.reject(new Error('test'));
        } else {
            return Promise.reject(new Error('test'));
        }
    }) as jest.Mock
);

beforeEach(() => {
    jest.clearAllMocks();
});

test('Fetching download-link error', async () => {
    const url = 'https://www.tiktok.com/@steuerfabi/video/7158115322103352582';
    return getVideoWatermarkFree(url).catch((error) => {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('test');
    });
});
