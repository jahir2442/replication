export default function({app}) {
    console.log(app);
    console.log(app.$cookies.getAll())
    console.log(app.$cookies.get('jwt', { parseJSON: false }))
    app.$cookies.get('jwt', { parseJSON: false })
}