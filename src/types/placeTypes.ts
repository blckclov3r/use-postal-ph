export type PlaceDataProps = {
    data: PlaceProps[];
};

export type PlaceProps = {
    municipality?: string;
    location?: string;
    post_code?: number | string;
    region?: string;
};

export type SearchCriteriaProps = {
    search?: number | string;
    limit?: number;
};

export type PlaceListCriteriaProps = PlaceProps & {
    limit?: number;
};