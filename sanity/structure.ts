import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Shop')
        .child(
          S.list()
            .title('Shop')
            .items([
              S.documentTypeListItem('product').title('Products'),
              S.documentTypeListItem('productCategory').title('Categories'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Training')
        .child(
          S.list()
            .title('Training')
            .items([
              S.documentTypeListItem('training').title('Courses'),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['post', 'category', 'author', 'product', 'productCategory', 'training'].includes(
            item.getId()!,
          ),
      ),
    ])
