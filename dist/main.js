const render = new Renderer()

getRoster = function() {
    let team = $('#input').val()
    $.get(`/teams/${team}`, function(data) {
        render.renderPlayers(data)
    })
}

getDreamTeam = function() {
    $.get(`/dreamTeam`, function(data) {
        render.renderPlayers(data)
    })
}

$("#players").on('click', '.fa-star', function() {
    $(this).toggleClass("gold")
    let player = $(this).closest('.player').data()
    player = { firstName: player.first, lastName: player.last, jersey: player.jersey, pos: player.pos, dreamTeam: true }
    if ($(this).hasClass("gold")) {
        $.post(`/roster`, player, function() {
            getRoster()
        })
    } else {
        $.ajax({
            method: 'DELETE',    
            url: '/roster',
            dataType: "json",
            data: player,
            success: getRoster()
        })
    }
})
