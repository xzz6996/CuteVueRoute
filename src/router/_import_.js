
module.exports = file => import(/*webpackChunkName: "group-foo" */'@/components/page/' + file + '.vue')