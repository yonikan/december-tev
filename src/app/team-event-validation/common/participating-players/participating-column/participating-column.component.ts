import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-participating-column',
  templateUrl: './participating-column.component.html',
  styleUrls: ['./participating-column.component.scss']
})
export class ParticipatingColumnComponent implements OnInit, OnChanges {
	@Input() players = [];
	@Input() actionName = '';
	@Output() excludePlayer = new EventEmitter();
	@Output() swapPlayer = new EventEmitter();

	private clubPlayers = [];
	private participatingPlayers = [];
	private currentPlayer = null;
	private HEADLINE = {
		Exclude: "Included",
		Include: "Not Included",
	}

	constructor() { }

	ngOnInit() {
	}

	ngOnChanges() {
		this.participatingPlayers = this.players.filter(player => player.isParticipated);
		this.clubPlayers = this.getClubPlayers();
	}

	preventDetailsOpen(e) {
		e.preventDefault();
	}

	openSummary(player, el: HTMLElement) {
		this.players = this.players.map(p => {
			if (p.id !== player.id)
				p.isOpen = false;
			return p;
		});

		player.isOpen = !player.isOpen;
		this.currentPlayer = player.isOpen ? player : null;
		this.scroll(el)
	}

	doSwapPlayer(player) {
		this.swapPlayer.emit({player, swappedPlayer: this.currentPlayer});
		this.clubPlayers = this.getClubPlayers();
		this.currentPlayer = null;
	}

  	scroll(el: HTMLElement) {
		setTimeout(() => {
			el.scrollIntoView({behavior:"smooth", block: "nearest"});
		}, 500);
	}

	getClubPlayers() {
		const clubPlayersGroup = this.players.reduce((acc, curr) => {
			if (!acc[curr.clubName]) acc[curr.clubName] = [];
			 acc[curr.clubName] = [...acc[curr.clubName], {...curr}];
			return acc;
		}, {});

		return Object
			.keys(clubPlayersGroup)
			.map((name, i) => {
				return {name, players: clubPlayersGroup[name]}
			});
	}

	exclude(player) {
		this.excludePlayer.emit(player);
	}

}
