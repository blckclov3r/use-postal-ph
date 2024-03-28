export interface PlacesProps {
    data: PlaceProps[] | undefined;
}

export interface PlaceProps {
    municipality?: string;
    location?: string;
    post_code?: number;
    region?: string;
}

export interface FilteredData<T> {
    data: T[] | undefined;
    count: number | undefined;
}

export interface SearchProps {
    search?: number | string;
    limit?: number;
}