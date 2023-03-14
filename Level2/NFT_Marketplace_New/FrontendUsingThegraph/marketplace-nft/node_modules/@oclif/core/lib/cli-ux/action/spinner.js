"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const supportsColor = require("supports-color");
const stripAnsi = require('strip-ansi');
const ansiStyles = require('ansi-styles');
const ansiEscapes = require('ansi-escapes');
const screen_1 = require("../../screen");
const spinners_1 = require("./spinners");
const base_1 = require("./base");
function color(s) {
    if (!supportsColor)
        return s;
    const has256 = supportsColor.stdout ? supportsColor.stdout.has256 : (process.env.TERM || '').includes('256');
    return has256 ? `\u001B[38;5;104m${s}${ansiStyles.reset.open}` : chalk.magenta(s);
}
class SpinnerAction extends base_1.ActionBase {
    constructor() {
        super();
        this.type = 'spinner';
        this.frames = spinners_1.default[process.platform === 'win32' ? 'line' : 'dots2'].frames;
        this.frameIndex = 0;
    }
    _start() {
        this._reset();
        if (this.spinner)
            clearInterval(this.spinner);
        this._render();
        this.spinner = setInterval(icon => this._render.bind(this)(icon), process.platform === 'win32' ? 500 : 100, 'spinner');
        const interval = this.spinner;
        interval.unref();
    }
    _stop(status) {
        if (this.task)
            this.task.status = status;
        if (this.spinner)
            clearInterval(this.spinner);
        this._render();
        this.output = undefined;
    }
    _pause(icon) {
        if (this.spinner)
            clearInterval(this.spinner);
        this._reset();
        if (icon)
            this._render(` ${icon}`);
        this.output = undefined;
    }
    _frame() {
        const frame = this.frames[this.frameIndex];
        this.frameIndex = ++this.frameIndex % this.frames.length;
        return color(frame);
    }
    _render(icon) {
        const task = this.task;
        if (!task)
            return;
        this._reset();
        this._flushStdout();
        const frame = icon === 'spinner' ? ` ${this._frame()}` : icon || '';
        const status = task.status ? ` ${task.status}` : '';
        this.output = `${task.action}...${frame}${status}\n`;
        this._write(this.std, this.output);
    }
    _reset() {
        if (!this.output)
            return;
        const lines = this._lines(this.output);
        this._write(this.std, ansiEscapes.cursorLeft + ansiEscapes.cursorUp(lines) + ansiEscapes.eraseDown);
        this.output = undefined;
    }
    _lines(s) {
        return stripAnsi(s).split('\n')
            .map(l => Math.ceil(l.length / screen_1.errtermwidth))
            .reduce((c, i) => c + i, 0);
    }
}
exports.default = SpinnerAction;
