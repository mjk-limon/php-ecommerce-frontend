import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = [
    ...nextVitals,
    ...nextTs,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            'prefer-const': 'warn',
            'react-hooks/immutability': 'warn',
            'react-hooks/purity': 'warn',
            'react-hooks/set-state-in-effect': 'warn',
            'react-hooks/set-state-in-render': 'warn',
        },
    },
];

export default eslintConfig;