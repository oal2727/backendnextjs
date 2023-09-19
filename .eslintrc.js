module.exports = {
	extends: [
		"next/core-web-vitals",
		// "eslint:recommended",
		// "plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: [ "@typescript-eslint" ],
	root: true,
	rules: {
		'indent': 'off',
		"no-console": "off",
		"react/no-unescaped-entities": "off",
		"@next/next/no-page-custom-font": "off",
		// Retornar siempre o no retornar nunca en una funcion
		"consistent-return": "error",

		// Usar tabs para la identación
		// "indent": [ "error", "tab" ],

		// Usar doble comillas
		"quotes": [ "error", "double" ],

		// Espacios consistentes en ciertos escenarios: a++ (no a ++) , new Object() (no: new(Object())) etc
		"space-unary-ops": "error",

		// Comas en los arrays y objetos importante en multilinea
		"comma-dangle": [ "error", "always-multiline" ],

		// Espacio entre los backets del array y los items. [ a, b ] (no: [a, b])
		"array-bracket-spacing": [ "error", "always" ],

		// Espacio entre los backets del objeto y los items. { a: 'b' } (no: {a:'b'})
		"object-curly-spacing": [ "error", "always" ],

		// Espacio después de comas
		"comma-spacing": [ "error", { before: false, after: true } ],

		// Espacio antes de un bloque. if (true) {} (no: if (true){} )
		"space-before-blocks": [ "error", "always" ],

		// Espacio entre keywords ...} else { ... (no: ...}else{... )
		"keyword-spacing": "error",

		// espacio entre arrows. () => {} (no: ()=>{})
		"arrow-spacing": "error",

		// Formato de los bloques stroustrup es el if () {
		// }
		"brace-style": [ "error", "stroustrup" ],

		// Usar consistentemente los "" en un objeto
		"quote-props": [ "error", "consistent-as-needed" ],

		// Espacio entre operadores
		"space-infix-ops": [ "error", { int32Hint: false } ],

		// Un solo espacio en el codigo. a === b (no: a     === b)
		"no-multi-spaces": "error",

		// Formatear los espacios dentro de un objeto
		"key-spacing": [ "error" ],

		// Poner siempre parantesis en los arrow functions
		"arrow-parens": [ "error", "always" ],

		// Remover los ; del codigo o (con always en lugar de never) ponerlos siempre
		"semi": [ "error", "never" ],

		// No tener espacios al final de las lineas
		"no-trailing-spaces": "error",

		"no-multiple-empty-lines": [ "error", { max: 1, maxEOF: 1 } ],
	},
	overrides: [
		{
			files: [ "*.ts", "*.tsx" ],
			rules: {
				// Usar obj[] en lugar de Array<obj>
				"@typescript-eslint/array-type": "error",

				// Evitar que se use any en el codigo
				"@typescript-eslint/no-explicit-any": "warn",

				// No permitir const self = this
				"@typescript-eslint/no-this-alias": "error",

				// Si una variable no se reasigna usar const
				"@typescript-eslint/prefer-as-const": "error",

				// Espacio antes del tipo de variable
				"@typescript-eslint/type-annotation-spacing": "error",

				// Usar tabs para la identación
				"@typescript-eslint/indent": [ "error", "tab" ],
			},
		},
	],
	env: {
		amd: true,
	},
	globals: {
		module: "readonly",
		axios: "readonly",
		__dirname: "readonly",
	},
}
