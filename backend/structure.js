import { EarthGlobeIcon, InfoOutlineIcon, ProjectsIcon, HomeIcon, RobotIcon, AccessDeniedIcon, UsersIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'


export const myStructure = (S, context) => {
  const entities = [
    S.divider(),
    S.listItem()
      .title('Homepage')
      .icon(HomeIcon)
      .child(S.document().schemaType('homepage').documentId('homepage')),
    orderableDocumentListDeskItem({type: 'work', title: 'Works', icon: ProjectsIcon, S, context}),
	S.documentTypeListItem('city').title('Cities'),
    S.divider(),
    S.listItem()
      .title('About')
      .icon(InfoOutlineIcon)
      .child(S.document().schemaType('about').documentId('about')),
	S.documentTypeListItem('client').title('Clients').icon(UsersIcon),
  ];
  const siteSettings = [
    S.divider(),
    S.listItem()
      .title('Seo')
      .icon(EarthGlobeIcon)
      .child(S.document().schemaType('seo').documentId('seo')),
	S.listItem()
      .title('Cookies')
      .icon(RobotIcon)
      .child(S.document().schemaType('cookies').documentId('cookies')),
	S.listItem()
      .title('Privacy')
      .icon(AccessDeniedIcon)
      .child(S.document().schemaType('privacy').documentId('privacy')),
    
  ];

  return S.list()
    .title('Content')
    .items([
      ...entities,
      ...siteSettings,
    ]);
};