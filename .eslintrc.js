
/**
 * ESLint 是一个插件化并且可配置的 JavaScript 语法规则和代码风格的检查工具。
 * 参考文档
 * 【eslint英文文档】https://eslint.org/docs/user-guide/configuring
 * 【eslint中文文档】http://eslint.cn/docs/rules/
 * 说明文档： https://blog.csdn.net/qq_40741855/article/details/88969563
 */

/**
 * eslint有三种使用方式
 * 【1】js代码中通过注释的方式使用
 * 【2】通过webpack的eslintConfig字段设置，eslint会自动搜索项目的package.json文件中的配置
 * 【3】通过配置文件的方式使用，配置文件有多种文件方式，如JavaScript、JSON 或者 YAML等
 */

/**
 * 文件忽略
 * 【】让eslint跳过特定文件的检测
 * 【】通过当前工作目录下 「.eslintignore」 文件进行设置
 *  其使用的是Glob路径书写方式，与「.gitignore」的使用方法相同
 * 【】也可以在 package.json 文件中，通过 eslintIgnore 参数进行设置
 */

/**
 * 文件内局部设置
 * 【】eslint可以具体文件中设置特定代码的规则，常用于跳过某条语句的检测。
 * 【】注销全部规则，在代码前新建一行，添加注销 /* eslint-disable *\/  。如果没有恢复设置的语句，则下列全部代码都会跳过检测。
 * 【】恢复eslint，在代码前新建一行，添加注销 /* eslint-enable *\/
 * 【】指定忽略的规则，/* eslint-disable no-alert, no-console *\/
 * 【】在特定行禁用，// eslint-disable-line
 * 【】在下一行禁用，// eslint-disable-next-line
 */
module.exports = {
  root: true, // 标识当前配置文件为eslint的根配置文件，让其停止在父级目录中继续寻找
  /**
  * 解析器配置项
  * http://eslint.cn/docs/user-guide/configuring#specifying-parser-options
  *  #这里设置的配置项将会传递到解析器中，被解析器获取到，进行一定的处理。具体被利用到，要看解析器的源码有没有对其进行利用。这里仅仅做了参数定义，做了规定，告诉解析器的开发者可能有这些参数
  *  #配置项目有：
  * "sourceType": "module",  // 指定JS代码来源的类型，script(script标签引入？) | module（es6的module模块），默认为script。为什么vue的会使用script呢？因为vue是通过babel-loader编译的，而babel编译后的代码就是script方式
  * "ecmaVersion": 6,     // 支持的ES语法版本，默认为5。注意只是语法，不包括ES的全局变量。全局变量需要在env选项中进行定义
  * "ecmaFeatures": {     // Features是特征的意思，这里用于指定要使用其他那些语言对象
    "experimentalObjectRestSpread": true, //启用对对象的扩展
    "jsx": true,              //启用jsx语法
    "globalReturn":true,          //允许return在全局使用
    "impliedStrict":true          //启用严格校验模式
   }
  */
  parserOptions: {
    /**
    * 解析器
    * http://eslint.cn/docs/user-guide/configuring#specifying-parser
    * #ESLint 默认使用Espree作为其解析器
    * #解析器必须是本地安装的一个 npm 模块。即必须按照在本地的node_module中
    * #解析器是用于解析js代码的，怎么去理解每一个表达式，有点C++中编译器的概念，会对js进行一些语法分析，语义分析什么的，才能判断语句符不符合规范。而不是通过简单的字符串对比。
    * #解析器有很多，但兼容eslint的解析器有以下几个
    * Espree：默认解析器，一个从Esprima中分离出来的解析器，做了一些优化
    * Esprima：js标准解析器
    * Babel-ESLint： 一个对Babel解析器的包装，babel本身也是js解析器的一种（不然怎么能转化为兼容性代码呢？首先需要进行js解析，才能转化）。如果我们的代码需要经过babel转化，则对应使用这个解析器
    * typescript-eslint-parser(实验) - 一个把 TypeScript 转换为 ESTree 兼容格式的解析器
    */
    parser: "babel-eslint", // 使用babel-eslint进行解析
    sourceType: "module" // 模块化代码
  },
  /**
  * 运行环境
  * http://eslint.cn/docs/user-guide/configuring#specifying-environments
  *  #一个环境定义了一组预定义的全局变量
  *  #获得了特定环境的全局定义，就不会认为是开发定义的，跳过对其的定义检测。否则会被认为改变量未定义
  *  #常见的运行环境有以下这些，更多的可查看官网
  * browser - 浏览器环境中的全局变量。
  * node - Node.js 全局变量和 Node.js 作用域。
  * es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
  * amd - 将 require() 和 define() 定义为像 amd 一样的全局变量。
  * commonjs - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
  * jquery - jQuery 全局变量。
  * mongo - MongoDB 全局变量。
  * worker - Web Workers 全局变量。
  * serviceworker - Service Worker 全局变量。
  */
  env: {
    node: true,
    browser: true, // browser: false 关闭对浏览器全局变量的支持，会导致使用window变量无法检验通过。这个属性如果未显示指明true也是可以编译通过的
    es6: true
  },
  /**
  * 规则继承
  * http://eslint.cn/docs/user-guide/configuring#extending-configuration-files
  * #可继承的方式有以下几种
  * #eslint内置推荐规则，就只有一个，即「eslint:recommended」
  * #可共享的配置， 是一个 npm 包，它输出一个配置对象。即通过npm安装到node_module中
  *  可共享的配置可以省略包名的前缀 eslint-config-，即实际设置安装的包名是 eslint-config-airbnb-base
  * #从插件中获取的规则，书写规则为 「plugin:插件包名/配置名」，其中插件报名也是可以忽略「eslint-plugin-」前缀。如'plugin:vue/essential'
  * #从配置文件中继承，即继承另外的一个配置文件，如'./node_modules/coding-standard/eslintDefaults.js'
  */
  // extends: ['plugin:vue/recommended', 'eslint:recommended'],
  extends: ["plugin:vue/essential", "eslint:recommended"], // "plugin:vue/essential":实现vue文件检测, "eslint:recommended": 启用eslint默认配置规则
  /**
  * 自定义规则
  * http://eslint.cn/docs/user-guide/configuring#configuring-rules
  * #基本使用方式
  * "off" 或者0 关闭规则
  * "warn" 或者1 将规则打开为警告（不影响退出代码）
  * "error" 或者2 将规则打开为错误（触发时退出代码为1）
  * 如：'no-restricted-syntax': 0, // 表示关闭该规则
  * #如果某项规则，有额外的选项，可以通过数组进行传递，而数组的第一位必须是错误级别。如0,1,2
  * 如 'semi': ['error', 'never'], never就是额外的配置项
  */
  rules: {
    "vue/max-attributes-per-line": [2, {
      "singleline": 10, // 配置单行能够防止的属性个数, 和多行的配置是二选一的
      // "multiline": {
      //   "max": 2, // 配置单行能够防止的属性个数，和单行的配置是二选一的
      //   "allowFirstLine": false // false: 不允许标签名上带有属性
      // }
    }],
    // 'vue/html-closing-bracket-newline': 'off',
    "vue/singleline-html-element-content-newline": "0", // 带属性的标签中的内容需另起一行
    "vue/multiline-html-element-content-newline": "0", // 元素中有多行内容，需每行内容各占一行
    "vue/component-definition-name-casing": ["error", "PascalCase"], // 规定组件中的name属性命名格式必须使用大驼峰命名法
    "vue/no-v-html": "off", // 关闭禁止使用v-html的规定
    "accessor-pairs": 2, // 强制 getter 和 setter 在对象中成对出现，与计算属性的get和set无关
    "arrow-spacing": [2, {
      "before": true,
      "after": true
    }], // 要求箭头函数的箭头之前或之后有空格
    "block-spacing": [2, "always"], // 禁止或强制在代码块中开括号前和闭括号后有空格
    "brace-style": [2, "1tbs", {
      "allowSingleLine": true // 允许块的开括号和闭括号在 同一行
    }], // 大括号的风格统一使用one true brace style
    'camelcase': [0, {
      'properties': 'always'
    }], // 禁用：要求使用骆驼拼写法
    'comma-dangle': [0, 'never'], // 拖尾逗号，对象字面量项尾可以有逗号
    // 'comma-dangle': [2, 'never'], // 拖尾逗号，对象字面量项尾不能有逗号
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }], // 强制在逗号周围使用空格
    'comma-style': [2, 'last'], // 逗号风格
    'constructor-super': 2, // 要求在构造函数中有 super() 的调用
    'curly': [2, 'multi-line'], // 强制所有控制语句使用一致的括号风格，如：if可以省略大括号
    'dot-location': [2, 'property'], // 强制在 点号 之前和之后一致的换行
    'eol-last': 2, // 文件末尾需存在至少一行空行
    // 'eol-last': 2,
    'eqeqeq': ["error", "always", { "null": "ignore" }], // 强制使用绝对等于（不等于）,不对null要求
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }], // 强制 generator 函数中 * 号周围使用一致的空格
    'handle-callback-err': [2, '^(err|error)$'], // 要求回调函数中有容错处理
    'indent': [2, 2, {
      'SwitchCase': 1 // 强制 switch 语句中的 case 子句的缩进2个空格
    }], // 强制使用一致的缩进
    'jsx-quotes': [2, 'prefer-single'], // 强制所有不包含单引号的 JSX 属性值使用单引号
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }], // 强制在对象字面量的属性中冒号后使用空格
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }], // 强制在关键字周围都使用空格
    'new-cap': [2, {
      'newIsCap': true, // 构造函数方法名必须大写
      'capIsNew': false // 构造函数不需要一定使用new
    }], // 构造函数大写限制
    'new-parens': 2, // 要求调用无参构造函数时带括号
    'no-array-constructor': 2, // 禁止使用 Array 构造函数
    'no-caller': 2, // 禁用 arguments.caller 或 arguments.callee
    'no-console': 'off', // 可以使用console
    'no-class-assign': 2, // 不允许修改类声明的变量
    'no-cond-assign': 2, // 禁止在条件语句中出现赋值操作符
    'no-const-assign': 2, // 禁止修改 const 声明的变量
    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符
    'no-delete-var': 2, // 禁止对变量使用 delete 操作符。
    'no-dupe-args': 2, // 禁止在 function 定义中出现重复的参数
    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称
    'no-dupe-keys': 2, // 禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2, // 禁止出现重复的 case 标签
    'no-empty-character-class': 2, // 禁止在正则表达式中出现空字符集
    'no-empty-pattern': 2, // 禁止使用空解构模式
    'no-eval': 2, // 禁用 eval()
    'no-ex-assign': 2, // 禁止对 catch 子句中的异常重新赋值
    'no-extend-native': 2, // 禁止扩展原生对象
    'no-extra-bind': 2, // 禁止不必要的bind()调用
    'no-extra-boolean-cast': 2, // 禁止不必要的布尔类型转换
    'no-extra-parens': [2, 'functions'], // 禁止冗余的括号
    'no-fallthrough': 2, // 禁止 case 语句落空
    'no-floating-decimal': 2, // 禁止数字字面量中使用前导和末尾小数点
    'no-func-assign': 2, // 禁止对 function 声明重新赋值
    'no-implied-eval': 2, // 禁止使用类似 eval() 的方法
    'no-inner-declarations': [2, 'functions'], // 禁止在嵌套的语句块中出现 function 声明
    'no-invalid-regexp': 2, // 禁止在 RegExp 构造函数中出现无效的正则表达式
    'no-irregular-whitespace': 'off', // 关闭，禁止在字符串和注释之外不规则的空白。2,不允许出现不规则的空格
    'no-iterator': 2, // 禁用 __iterator__ 属性
    'no-label-var': 2, // 禁止同一作用域下，标签与属性同名
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }], // 禁用标签语句
    'no-lone-blocks': 2, // 禁用不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2, // 禁止空格和 tab 的混合缩进
    'no-multi-spaces': 2, // 禁止使用多个空格
    'no-multi-str': 2, // 禁止使用多行字符串
    'no-multiple-empty-lines': [2, {
      'max': 1 // 最多空一行
    }], // 禁止出现多行空行
    "no-global-assign": 2, // 禁止对原生对象或只读的全局对象进行赋值
    'no-unsafe-negation': 2, // 禁止对关系运算符的左操作数使用否定操作符

    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,

    'no-new-object': 2, // 禁用 Object 的构造函数
    'no-new-require': 2, // 禁止调用 require 时使用 new 操作符
    'no-new-symbol': 2, // 禁止 Symbol 对象前使用 new
    'no-new-wrappers': 2, // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-obj-calls': 2, // 禁止把全局对象作为函数调用
    'no-octal': 2, // 禁用八进制字面量

    'no-octal-escape': 2, // 禁止在字符串字面量中使用八进制转义序列
    'no-path-concat': 2, // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-proto': 2, // 禁用__proto__，可使用 Object.getPrototypeOf 和 Object.setPrototypeOf 代替。
    'no-redeclare': 2, // 禁止多次声明同一变量
    'no-regex-spaces': 2, // 禁止正则表达式字面量中出现多个空格
    'no-return-assign': [2, 'except-parens'], // 禁止在 return 语句中使用赋值语句
    'no-self-assign': 2, // 禁止自我赋值
    'no-self-compare': 2, // 禁止自身比较
    'no-sequences': 2, // 禁用逗号操作符
    'no-shadow-restricted-names': 2, // 禁止将标识符定义为受限的名字
    'func-call-spacing': 2, // 禁止在函数标识符和其调用之间有空格
    'no-sparse-arrays': 2, // 禁用稀疏数组（error:[,,] | true: [1,2,]）
    'no-this-before-super': 2, // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-throw-literal': 2, // 禁止抛出的异常不是Error 对象
    'no-trailing-spaces': 2, // 禁止使用行尾空白（空格、tab 和其它 Unicode 空白字符）。
    'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef-init': 2, // 禁止将变量初始化为 undefined
    'no-unexpected-multiline': 2, // 禁止出现令人困惑的多行表达式
    'no-unmodified-loop-condition': 2, // 禁用一成不变的循环条件，防止死循环
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false // 禁止条件表达式作为默认的赋值模式
    }], // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unreachable': 2, // 禁止在 return、throw、continue 和 break 语句之后出现,如果执行的代码
    'no-unsafe-finally': 2, // 禁止在 finally 语句块中出现控制流语句
    'no-unused-vars': [2, {
      'vars': 'all', // 检测所有变量，包括全局环境中的变量。
      'args': 'none' // 不检查参数。
    }], // 禁止出现未使用过的变量
    'no-useless-call': 2, // 禁止不必要的 .call() 和 .apply()
    'no-useless-computed-key': 2, // 禁止在对象中使用不必要的计算属性
    'no-useless-constructor': 2, // 禁用不必要的构造函数
    'no-useless-escape': 0, // 禁用不必要的转义字符
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'no-with': 2, // 禁用 with 语句
    'one-var': [2, {
      'initialized': 'never' // 要求每个作用域的初始化的变量有多个变量声明，除非变量没有初始化
    }], // 强制函数中的变量要么一起声明要么分开声明
    'operator-linebreak': [2, 'after', { // 要求把换行符放在操作符后面
      'overrides': {
        '?': 'before', // 问号置于操作数之前
        ':': 'before'  // 冒号置于操作数之前
      }
    }],
    'padded-blocks': [2, 'never'], // 禁止块内填充（块内不能出现首尾空行）
    // 'quotes': [2, 'single', { // js代码中，必须使用单引号
    //   'avoidEscape': true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
    //   'allowTemplateLiterals': true // 允许字符串使用反勾号
    // }], // 强制使用一致的反勾号、双引号或单引号
    'quotes': [0, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }], // 不校验单引号和双引号
    // "singleQuote": true, // 使用单引号
    // 'semi': 0, // 不检查分号
    // 'semi': [2, 'never'], // 语句结尾不加分号；
    "semi": [2, "always"],//语句结尾强制加分号
    'semi-spacing': [2, { 'before': false, 'after': true }],
    'space-before-blocks': [2, 'always'], // 强制代码块之前出现空格
    /*'space-before-function-paren'冲突： https://github.com/prettier/prettier/issues/3847 */
    // 'space-before-function-paren': [2, 'never'],
    'space-before-function-paren': 0, // 关闭函数圆括号之前有一个空格，这个会和prettier冲突，暂未找到解决方法
    'space-in-parens': [2, 'never'], // 禁止圆括号内出现空格
    'space-infix-ops': 2, // 强制操作符周围有空格
    'space-unary-ops': [2, {
      'words': true, // 适用于单词类一元操作符，例如：new、delete、typeof、void、yield
      'nonwords': false // 不适用于这些一元操作符: -、+、--、++、!、!!
    }], // 在一元操作符之前或之后存在空格
    'spaced-comment': [2, 'always', { // 注释// 或 /* 必须跟随至少一个空白。
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] // 这些字符在注释头可以不出现空格
    }], // 强制在注释中 // 或 /* 使用一致的空格
    'template-curly-spacing': [2, 'never'], // 禁止模板字符串花括号内出现空格（可以换行）
    'use-isnan': 2, // 强制使用 isNaN() 检查 NaN
    'valid-typeof': 2, // 强制 typeof 表达式与有效的字符串进行比较
    'wrap-iife': [2, 'any'], // 强制立即执行的函数用括号包裹
    'yield-star-spacing': [2, 'both'], // 强制在 yield* 表达式中 * 周围使用空格
    'yoda': [2, 'never'], // 禁止将字面变量写在表达式的左边
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 生产环境禁用 debugger
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: true
    }], // 强制在花括号中使用一致的空格
    'array-bracket-spacing': [2, 'never'], // 强制数组方括号中使用一致的空格

  }
}