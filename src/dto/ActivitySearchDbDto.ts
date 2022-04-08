
export class ActivitySearchDbDto {


  id: number;

  period: string;

  is_visible: boolean;

  updated_at: string;

  created_at: string;
  author_id: {
    name: string
  }
  media: {
    id: number,
    name: string,
    hex_color: string
  }
  relevance: {
    id: number,
    name: string
  }


}

