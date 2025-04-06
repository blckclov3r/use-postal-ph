export type PlaceProps = {
    municipality?: string;
    location?: string;
    post_code?: string | number;
    region?: string;
};

export type SearchCriteriaProps = {
    search?: string | number;
    limit?: number;
};

export type PlaceListCriteriaProps = PlaceProps & {
    limit?: number;
};