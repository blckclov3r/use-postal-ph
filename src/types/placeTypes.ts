export interface PlaceProps {
    municipality?: string;
    location?: string;
    post_code?: string | number;
    region?: string;
}

export interface SearchCriteriaProps {
    search?: string | number;
    limit?: number;
}

export interface PlaceListCriteriaProps extends PlaceProps {
    limit?: number;
}

export interface FetchResult<T> {
    data: T[];
    count: number;
}
