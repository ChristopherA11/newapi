module.exports = {
    testEnvironment: 'jsdom',

   
  
    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
    // The glob patterns Jest uses to detect test files
    // testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  
    // A list of paths to directories that Jest should use to search for files in
    // roots: ['<rootDir>/__test__'],

    roots: ['<rootDir>/__test__/javascript'],

    setupFilesAfterEnv:["@testing-library/jest-dom"],

    moduleNameMapper: {
        "\\.(css|less |sass|scss)$": "<rootDir>/__mocks__styleMock.js",
    },
  
    // A transformer for JavaScript and TypeScript files
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },     
  };

 

  

// module.exports = {
//   testEnvironment: 'jsdom',
//   rootDir: '.',
//   modulePaths: ['<rootDir>'],
//   moduleDirectories: ['node_modules', 'src'],
//   setupFilesAfterEnv: ['<rootDir>/setupJest.js'],
// // setupFiles: ["<rootDir>/jest.setup.js"],
// "setupFiles": ["<rootDir>/mocks/xmlhttprequest.js"]

// };





  