const rxjs = require('rxjs');
const rxjs_op = require('rxjs/operators');


function parse_data(data, twoLetters) {
    return rxjs.from(data.toString().split(/(\s+)/)).pipe(
        rxjs_op.filter(word => word.trim().length > 0),
        rxjs_op.map(word => word.toLowerCase().replace(/[.!?",;:]/g, '')),
        rxjs_op.filter(word => word.startsWith(twoLetters)),
        rxjs_op.groupBy(word => word),
        rxjs_op.mergeMap(group => group.pipe(rxjs_op.reduce((acc, val, index) => [index + 1, val]))),
        rxjs_op.reduce((acc, val) => [...acc, val])
    );
}

module.exports = {
    parse_data
};
