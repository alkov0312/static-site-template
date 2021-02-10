const { src, watch, parallel, series, dest } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const wait = require("gulp-wait");

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

const watching = () => {
    watch("src/data/scss/**/*.scss").on("change", scss);
    watch("src/**/*.html").on("change", browserSync.reload);
    watch("src/**/*.css").on("change", browserSync.reload);
    watch("src/**/*.js").on("change", browserSync.reload);
    watch("src/data/json/**/*.json").on("change", browserSync.reload);
};

exports.default = parallel(server, scss, watching);
