const { src, watch, parallel, series, dest } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const wait = require("gulp-wait");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");

const libs = {
    css: [],
    js: [],
};

const server = () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "src",
        },
    });
};

const scss = () =>
    src("src/data/scss/common.scss")
        .pipe(sourcemaps.init())
        .pipe(wait(200))
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest("src/data"))
        .pipe(browserSync.stream());

const scriptsBuild = () =>
    src(libs.js.push("src/data/common.js"))
        .pipe(concat("common.min.js"))
        .pipe(uglify())
        .pipe(dest("build/data/"));

const stylesBuild = () =>
    src(libs.css.push("src/data/common.css"))
        .pipe(concat("common.min.css"))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 10 versions"],
                grid: true,
            })
        )
        .pipe(
            cleancss({
                level: { 1: { specialComments: 0 } },
            })
        )
        .pipe(dest("build/data/"));

const imagesOptimization = () => {};

const copyFiles = () => {};

const watching = () => {
    watch("src/data/scss/**/*.scss").on("change", scss);
    watch("src/css/**/*.css").on("change", browserSync.reload);
    watch("src/**/*.html").on("change", browserSync.reload);
};

const build = () => {};

exports.default = parallel(server, scss, watching);
exports.stylesBuild = stylesBuild;
