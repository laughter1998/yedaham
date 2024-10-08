tailwind.config = {
    theme: {
      extend: {
        colors: {
          ccc: '#ccc',
          red: '#ea1919',
          redOpa1: 'rgba(255, 125, 218, 0.1)',
          redOpa2: 'rgba(255, 125, 218, 0.2)',
          blue: '#003fff',
          blueMain: '#213F9A',
          blueLight: '#0085ff',
          blueOpa1: 'rgba(0, 133, 255, 0.1)',
          blueOpa2: 'rgba(0, 133, 255, 0.2)',
          yellowOpa1: 'rgba(255, 168, 0, 0.2)',
          greenOpa1: 'rgba(69, 184, 51, 0.1)',
          333: '#333',
          666: '#666',
          777: '#777',
          999: '#999',
          ddd: '#ddd',
          d9: '#d9d9d9',
          f5: '#f5f5f5',
        },
        fontSize: {
          '32': '32px',
        },
        width: {
          '50' : '200px',
        },
        height: {
          'dialog-calc': 'calc(100dvh - 324px)',
          'prdAdd-calc': 'calc(100dvh - 200px)',
          'information-calc': 'calc(100dvh - 200px)',
        },
        letterSpacing: {
          'custom-2px': '2px',
        },
        fontFamily: {
          nanumSquare300: ['NanumSquareNeoLight', 'sans-serif'],
          nanumSquare400: ['NanumSquareNeo', 'sans-serif'],
          nanumSquare700: ['NanumSquareNeoBold', 'sans-serif'],
          nanumSquare800: ['NanumSquareNeoExtraBold', 'sans-serif'],
          nanumSquare900: ['NanumSquareNeoHeavy', 'sans-serif'],
        }
      },
    },
  };
