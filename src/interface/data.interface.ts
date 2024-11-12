export interface Data {
    price:        Price;
    volume:       Volume;
    daily_trend:  { [key: string]: number };
    hourly_trend: { [key: string]: number };
    price_trend:  Array<number | null>;
}

export interface Price {
    mean:       number;
    max:        number;
    min:        number;
    std_dev:    number;
    median:     number;
    volatility: number;
}

export interface Volume {
    mean:    number;
    max:     number;
    min:     number;
    std_dev: number;
    total:   number;
}
