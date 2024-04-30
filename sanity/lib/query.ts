import { Language } from "@/types/language";
import { Slug } from "@/types/sanity-types";
import { groq } from "next-sanity";

export type QueryOptions = {
  schemaType: string;
  slug?: string;
  language?: Language;
  firstOnly?: boolean;
  sort?: string;
  fields?: string;
  translatedFields?: string;
};

function queryString(options: QueryOptions) {
  const {
    schemaType,
    slug,
    language,
    firstOnly,
    sort,
    fields,
    translatedFields,
  } = options;
  return `*[_type == "${schemaType}"${
    language ? ` && language == "${language}"` : ""
  }${slug ? ` && slug.current == "${slug}"` : ""}]${
    firstOnly ? `[0]` : sort ? ` | order(${sort})` : ""
  }{
        ...,
        ${
          translatedFields
            ? `"_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
            language,
            ${translatedFields}
          },`
            : ""
        }
        ${fields ? fields : ""}
    }`;
}

export function query(query: QueryOptions) {
  return groq`${queryString(query)}`;
}

export function multiQuery(query: { [key: string]: QueryOptions }) {
  return groq`{${Object.keys(query).map((key) => {
    return `\n"${key}": ${queryString(query[key])},`;
  })}
    }`;
}

export function translationQuery(_id: string) {
  return groq`
    *[_id == "${_id}"][0]{
        "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
        ...,
      },
    }
`;
}

export function translationsQuery({
  schemaType,
  slug,
  language,
}: {
  schemaType: string;
  slug: string;
  language: Language;
}) {
  return groq`
    *[slug.current == "${slug}" && _type == "${schemaType}" && language == "${language}"][0]{
        language,
        "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
        ...,
    },
  }
`;
}

export const documentsQuery = groq`
	*[_type == "page" || _type == "blog-post"] {
		...,
	}
`;

export function pageQuery(slug: string | Slug, language: Language) {
  return groq`
	*[_type == "page" && slug.current == "${
    typeof slug === "string" ? slug : slug.current
  }" && language == "${language}"][0] {
		...,
    featured {
      _type,
      text,
      title,
      callToAction {
        title,
        link-> {
          _id,
          _type,
          slug,
          language
        }
      }
    }
	}
`;
}

export function blogPostQuery(slug: string | Slug, language: Language): string {
  return groq`
	*[_type == "blog-post" && slug.current == "${
    typeof slug === "string" ? slug : slug.current
  }" && language == "${language}"][0] {
		...,
	}
`;
}
