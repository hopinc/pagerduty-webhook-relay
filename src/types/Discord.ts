export interface DiscordMessage {
  content?: string;
  embeds?: Embed[];
}

export interface Embed {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  timestamp?: string;
  footer?: Footer;
  thumbnail?: Image;
  image?: Image;
  author?: Author;
  fields?: Field[];
}

export interface Author {
  name?: string;
  url?: string;
  icon_url?: string;
}

export interface Field {
  name: string;
  value: string;
  inline?: boolean;
}

export interface Footer {
  icon_url?: string;
  text?: string;
}

export interface Image {
  url: string;
}
