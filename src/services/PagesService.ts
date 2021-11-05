import type {
  PagesServiceProps,
  PagesService as PagesServiceInterface,
  TemplatesMap,
  DraftJsContentState,
  ContentBlock,
  JSONValue,
} from '@via-profit-services/pages';

class PagesService implements PagesServiceInterface {
  private props: PagesServiceProps;
  private templatesMap: TemplatesMap;

  public constructor(props: PagesServiceProps) {
    this.props = props;
  }

  public contentBlocksArrayToObject<K extends string>(
    blocks: ContentBlock[],
    keys: K[],
  ): Record<K, JSONValue | undefined> {
    const records: any = {};
    keys.forEach(key => {
      records[key] = [...(blocks || [])].find(({ name }) => name === key)?.content || '';
    });

    return records;
  }

  public draftJsRawToGraphQL(draftJsRaw: DraftJsContentState | null): DraftJsContentState {
    const { blocks, entityMap } = draftJsRaw || { blocks: [], entityMap: {} };

    return {
      entityMap: entityMap || {},
      blocks: [...(blocks || [])].map(block => ({
        ...block,
        type: block.type.toUpperCase().replace(/-/g, '_'),
      })),
    };
  }
}

export default PagesService;
