enum ChipTypes {
    FRIEND = 'FRIEND',
    ENEMY = 'ENEMY',
}
export class ChipDto {
    id: string;
    type: ChipTypes;
    number: number;
    room: string;
}