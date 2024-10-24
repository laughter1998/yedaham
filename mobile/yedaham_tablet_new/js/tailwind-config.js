tailwind.config = {
    theme: {
      extend: {
        colors: {
          ccc: '#ccc',
          red: '#ea1919',
          redOpa1: 'rgba(255, 125, 218, 0.1)',
          redOpa2: 'rgba(255, 125, 218, 0.2)',
          redLightOpa: 'rgba(234, 25, 25, 0.05)',
          blue: '#003fff',
          blue2 : '#1f8aed',
          blueMain: '#213F9A',
          blueLight: '#0085ff',
          blueOpa1: 'rgba(0, 133, 255, 0.1)',
          blueOpa2: 'rgba(0, 133, 255, 0.2)',
          blueOpa3: 'rgba(0, 133, 255, 0.05)',
          blueOpa4: 'rgba(0, 133, 255, 0.15)',
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
          'calc-56': 'calc(100dvh - 56px)',
          'calc-88': 'calc(100dvh - 88px)',
          'calc-200': 'calc(100dvh - 200px)',
          'calc-210': 'calc(100dvh - 210px)',
          'calc-260': 'calc(100dvh - 260px)',
          'calc-268': 'calc(100dvh - 268px)',
          'calc-274': 'calc(100dvh - 274px)',
          'calc-292': 'calc(100dvh - 292px)',
          'calc-306': 'calc(100dvh - 306px)',
          'calc-324': 'calc(100dvh - 324px)',
          'calc-332': 'calc(100dvh - 332px)',
          'calc-418': 'calc(100dvh - 418px)',
          'calc-448': 'calc(100dvh - 448px)',
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
        },
        backgroundImage: {
          'custom-gradientGray': `
          linear-gradient(to top, #fff 0%, rgba(255, 255, 255, 0) 100%),
          linear-gradient(to bottom, #f5f5f5, #f5f5f5)
        `,
        },
      },
    },
  };
