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
                    get: () => 'cookie',
                },
            });
        }
        if (url === 'https://tikfast.net/tik-download/download-link') {
            return Promise.resolve({
                json: () => {
                    return Promise.resolve({
                        status: 'ok',
                        code: 200,
                        data: [
                            {
                                water_free_link:
                                    'hgfhdgfdhgfdhgfdhgfdhgfdhgfdhg',
                                description: 'test',
                            },
                        ],
                    });
                },
            });
        }
        if (url === 'https://tikfast.net/tik-download/download') {
            return Promise.reject(new Error('download reject'));
        }
        return Promise.resolve({});
    }) as jest.Mock,
);

beforeEach(() => {
    jest.clearAllMocks();
});

test('Fetching download reject', async () => {
    const url = 'https://www.tiktok.com/@steuerfabi/video/7158115322103352582';
    return getVideoWatermarkFree(url).catch((error) => {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('download reject');
    });
});
