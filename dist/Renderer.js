class Renderer {
    constructor() {
        this._team = $('#players')
    }
    
    renderPlayers(players) {
        this._team.empty()
        const source = $("#players-template").html()
        const template = Handlebars.compile(source)

        const html = template({ players })
        this._team.append(html)
    }
    
}