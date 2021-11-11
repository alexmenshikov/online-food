"use strict";

const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
// const sass = require('gulp-sass');
const cssmin = require("gulp-cssmin");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const concatCss = require("gulp-concat-css");
const jsmin = require("gulp-jsmin");

sass.compiler = require("node-sass");

function styles() {
	return src("./src/sass/main.scss")
		.pipe(sass())
		.pipe(concatCss("main.css"))
		.pipe(cssmin())
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest("./css"));
}

// function html() {
// 	return src("./src/*.html")
// 		.pipe(
// 			htmlmin({
// 				// удаляем все перносы
// 				collapseWhitespace: true,
// 				// удаляем все комментарии
// 				removeComments: true,
// 			})
// 		)
// 		.pipe(dest("./"));
// }

function js() {
	return src("./src/js/main.js")
		.pipe(jsmin())
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest("./js"));
}

function jsMenu() {
	return src("./src/js/menu.js")
		.pipe(jsmin())
		.pipe(rename({ suffix: ".min" }))
		.pipe(dest("./js"));
}

function watching() {
	watch("./src/sass/*.scss", styles);
	// watch("./src/*.html", html);
	watch("./src/js/main.js", js);
	watch("./src/js/menu.js", jsMenu);
}

exports.styles = styles;
// exports.html = html;
exports.js = js;
exports.watching = watching;

exports.default = parallel(styles, js, jsMenu, watching);

// exports.sass = function () {
// 	return src("./sass/main.scss")
// 		.pipe(sass())
// 		.pipe(concatCss("main.css"))
// 		.pipe(cssmin())
// 		.pipe(rename({ suffix: ".min" }))
// 		.pipe(dest("./css"));
// };

// exports.task("minify", () => {
// 	return src("./*.html")
// 		.pipe(
// 			htmlmin({
// 				// удаляем все перносы
// 				collapseWhitespace: true,
// 				// удаляем все комментарии
// 				removeComments: true,
// 			})
// 		)
// 		.pipe(dest("./dist"));
// });

// exports.default = function () {
// 	// series - выполнение задач последовательно
// 	// parallel - запустить задачи одновременно
// 	watch("./sass/*.scss", series("sass"));
// };
