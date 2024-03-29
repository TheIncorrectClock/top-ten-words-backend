const rxjs = require('rxjs');
const rxjs_op = require('rxjs/operators');


function parse_data(data, twoLetters) {
    return rxjs.from(data.toString().split(/(\s+|--)/))
        .pipe(
            rxjs_op.filter(word => word.trim().length > 0),
            rxjs_op.map(word => word.toLowerCase().replace(/[.!?",;:]/g, '')),
            rxjs_op.filter(word => word.startsWith(twoLetters.toLowerCase())),
            rxjs_op.groupBy(word => word),
            rxjs_op.mergeMap(group =>
                group.pipe(
                    rxjs_op.reduce((acc, val, index) => {
                        return {count: index + 1, value: val}
                    }, {}))),
            rxjs_op.reduce((acc, val) => [...acc, val], []),
        ).pipe(
            rxjs_op.map(array => array.sort((a, b) => a.count > b.count ? -1 : 1)),
            rxjs_op.map(array => array.splice(0, 10))
        )
}

module.exports = {
    parse_data
};
