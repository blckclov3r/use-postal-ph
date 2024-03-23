export interface PlacesProps {
    data: PlaceProps[] | undefined;
}

export interface PlaceProps {
    municipality?: string | undefined;
    location?: string | undefined;
    post_code?: number | undefined;
    region?: string | undefined;
}

export interface FilteredData<T> {
    data: T[] | undefined;
    count: number | undefined;
}

export interface SearchProps {
    search?: number | string | undefined;
    limit?: number | undefined;
}