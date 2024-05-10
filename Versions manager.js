
/*
In this kata we are going to mimic a software versioning system.

You have to implement a vm function returning an object.

It should accept an optional parameter that represents the initial version. The input will be in one of the following formats: "{MAJOR}", "{MAJOR}.{MINOR}", or "{MAJOR}.{MINOR}.{PATCH}". More values may be provided after PATCH but they should be ignored. If these 3 parts are not decimal values, an exception with the message "Error occured while parsing version!" should be thrown. If the initial version is not provided or is an empty string, use "0.0.1" by default.

This class should support the following methods, all of which should be chainable (except release):

major() - increase MAJOR by 1, set MINOR and PATCH to 0
minor() - increase MINOR by 1, set PATCH to 0
patch() - increase PATCH by 1
rollback() - return the MAJOR, MINOR, and PATCH to their values before the previous major/minor/patch call, or throw an exception with the message "Cannot rollback!" if there's no version to roll back to. Multiple calls to rollback() should be possible and restore the version history
release() - return a string in the format "{MAJOR}.{MINOR}.{PATCH}"
*/

const vm = function (input) {
    if (input === '' || !input) input = "0.0.1"
    input = input.split('.').slice(0, 3);
    input.every(el => el.match([0 - 9]))
    if (!input.every(el => (/\d/).test(el))) throw new Error('Error occured while parsing version!');
    return {
        MAJOR: +input[0],
        MINOR: +input[1] || 0,
        PATCH: +input[2] || 0,
        states: [],
        major: function () {
            this.states.push(`${this.MAJOR}.${this.MINOR}.${this.PATCH}`);
            this.MAJOR += 1; this.MINOR = 0; this.PATCH = 0;
            return this;
        },
        minor: function () { this.states.push(`${this.MAJOR}.${this.MINOR}.${this.PATCH}`); this.MINOR++; this.PATCH = 0; return this; },
        patch: function () { this.states.push(`${this.MAJOR}.${this.MINOR}.${this.PATCH}`); this.PATCH++; return this; },
        release: function () {
            return `${this.MAJOR}.${this.MINOR}.${this.PATCH}`
        },
        rollback: function () {
            if (!this.states[0]) throw new Error('Cannot rollback!')
            this.MAJOR = +this.states[this.states.length - 1].split('.')[0]
            this.MINOR = +this.states[this.states.length - 1].split('.')[1]
            this.PATCH = +this.states[this.states.length - 1].split('.')[2]
            this.states.pop();
            return this;
        }
    }
}
