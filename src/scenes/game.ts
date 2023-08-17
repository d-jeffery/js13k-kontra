import {Scene} from "kontra";
import {CPlayer} from "../player-small";

export const gameScene = Scene({
    id: 'game',
    player: new CPlayer(),


});