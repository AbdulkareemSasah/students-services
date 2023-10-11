
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.3.1
 * Query Engine version: ac9d7041ed77bcc8a8dbd2ab6616b39013829574
 */
Prisma.prismaVersion = {
  client: "5.3.1",
  engine: "ac9d7041ed77bcc8a8dbd2ab6616b39013829574"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  password: 'password',
  image: 'image',
  role: 'role'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.LanguageScalarFieldEnum = {
  id: 'id',
  label: 'label',
  language: 'language',
  common: 'common'
};

exports.Prisma.GlobalScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GlobalTranslationScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  name: 'name',
  logo: 'logo',
  favicon: 'favicon',
  images: 'images',
  description: 'description',
  globalId: 'globalId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SocialLinkScalarFieldEnum = {
  id: 'id',
  social: 'social',
  url: 'url',
  globalId: 'globalId'
};

exports.Prisma.NavbarItemScalarFieldEnum = {
  id: 'id',
  isDropdown: 'isDropdown',
  forArticle: 'forArticle',
  forPage: 'forPage',
  pageId: 'pageId',
  articleId: 'articleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NavbarItemTranslationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  lang: 'lang',
  navbarItemId: 'navbarItemId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DropDownGroupScalarFieldEnum = {
  id: 'id',
  navItemId: 'navItemId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DropDownGroupTranslationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  lang: 'lang',
  dropdownGroupId: 'dropdownGroupId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DropdownItemScalarFieldEnum = {
  id: 'id',
  groupId: 'groupId',
  pageId: 'pageId',
  forGroup: 'forGroup',
  forArticle: 'forArticle',
  forPage: 'forPage',
  articleId: 'articleId',
  navItemId: 'navItemId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DropdownItemTranslationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  lang: 'lang',
  dropdownItemId: 'dropdownItemId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FooterScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FooterTranslationScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  footerId: 'footerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GroupFooterScalarFieldEnum = {
  id: 'id',
  footerId: 'footerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GroupFooterTranslationScalarFieldEnum = {
  id: 'id',
  title: 'title',
  groupfooterId: 'groupfooterId',
  lang: 'lang',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PageScalarFieldEnum = {
  id: 'id',
  groupFooterId: 'groupFooterId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PageTranslationScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  userId: 'userId',
  title: 'title',
  description: 'description',
  images: 'images',
  published: 'published',
  pageId: 'pageId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryTranslationScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  userId: 'userId',
  name: 'name',
  description: 'description',
  images: 'images',
  categoryId: 'categoryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ArticleScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  footerId: 'footerId',
  groupfooterId: 'groupfooterId'
};

exports.Prisma.ArticleTranslationScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  userId: 'userId',
  slug: 'slug',
  published: 'published',
  title: 'title',
  description: 'description',
  articleId: 'articleId',
  images: 'images',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TagScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TagTranslationScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  tagId: 'tagId',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  articleId: 'articleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommentTranslationScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  userId: 'userId',
  name: 'name',
  body: 'body',
  commentId: 'commentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BlockScalarFieldEnum = {
  id: 'id',
  type: 'type',
  content: 'content',
  pageId: 'pageId',
  articleId: 'articleId',
  categoryServiceId: 'categoryServiceId',
  serviceId: 'serviceId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryServiceScalarFieldEnum = {
  id: 'id',
  published: 'published',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryServiceTranslationScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  name: 'name',
  descriprion: 'descriprion',
  images: 'images',
  categoryServiceId: 'categoryServiceId',
  published: 'published',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ServiceScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ServiceTranslationScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  name: 'name',
  description: 'description',
  serviceId: 'serviceId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  studentId: 'studentId',
  serviceId: 'serviceId',
  DescriptionOtherService: 'DescriptionOtherService',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  USER: 'USER',
  AUTHER: 'AUTHER',
  ADMIN: 'ADMIN',
  SUPERUSER: 'SUPERUSER'
};

exports.Prisma.ModelName = {
  Account: 'Account',
  Session: 'Session',
  User: 'User',
  VerificationToken: 'VerificationToken',
  Language: 'Language',
  Global: 'Global',
  GlobalTranslation: 'GlobalTranslation',
  SocialLink: 'SocialLink',
  NavbarItem: 'NavbarItem',
  NavbarItemTranslation: 'NavbarItemTranslation',
  DropDownGroup: 'DropDownGroup',
  DropDownGroupTranslation: 'DropDownGroupTranslation',
  DropdownItem: 'DropdownItem',
  DropdownItemTranslation: 'DropdownItemTranslation',
  Footer: 'Footer',
  FooterTranslation: 'FooterTranslation',
  GroupFooter: 'GroupFooter',
  GroupFooterTranslation: 'GroupFooterTranslation',
  Page: 'Page',
  PageTranslation: 'PageTranslation',
  Category: 'Category',
  CategoryTranslation: 'CategoryTranslation',
  Article: 'Article',
  ArticleTranslation: 'ArticleTranslation',
  Tag: 'Tag',
  TagTranslation: 'TagTranslation',
  Comment: 'Comment',
  CommentTranslation: 'CommentTranslation',
  Block: 'Block',
  CategoryService: 'CategoryService',
  CategoryServiceTranslation: 'CategoryServiceTranslation',
  Service: 'Service',
  ServiceTranslation: 'ServiceTranslation',
  Order: 'Order'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://github.com/prisma/prisma/issues`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
