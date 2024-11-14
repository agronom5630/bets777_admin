export interface Player {
    id: number;
    telegramId: string;
    userName: string;
    firstName: string;
    lastName: string;
    wallet: string;
    registeredAt: Date;
    lastActivity: Date;
    languageCode: string;
    vibro: boolean;
    authToken: string;
    parentId: number | null;
    tapBot: number;
    gameBalance: number;
    tapBalance: number;
    multiTapLevel: {
        id: number;
        levelId: number;
        description: string;
        clickValue: number;
        cost: number;
    },
    energyLimitLevel: {
        id: number;
        levelId: number;
        description: string;
        energyLimit: number;
        cost: number;
    },
    rechargingSpeedLevel: {
        id: number;
        levelId: number;
        description: string;
        value: number;
        cost: number;
    },
    gameLevel: {
        id: number;
        title: string;
        levelId: number;
        description: string;
        img: string;
        fromBalance: number;
        toBalance: number;
    },
    energyLimitLevelId: number;
    rechargingSpeedLevelId: number;
    multiTapLevelId: number;
    gameLevelId: number;
}