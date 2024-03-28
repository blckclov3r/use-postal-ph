export interface PlacesProps {
    data: Partial<PlaceProps>[];
}

export interface PlaceProps {
    municipality: string;
    location: string;
    post_code: number | string;
    region: string;
}

export interface SearchProps {
    search: number | string;
    limit: number;
}

export interface PlaceListProps extends Partial<PlaceProps> {
    limit: number;
}