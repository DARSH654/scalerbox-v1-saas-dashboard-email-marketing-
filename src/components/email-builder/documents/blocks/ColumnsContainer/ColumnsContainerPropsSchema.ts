import { z } from 'zod';

import { ColumnsContainerPropsSchema as BaseColumnsContainerPropsSchema } from '@usewaypoint/block-columns-container';

const BasePropsShape = BaseColumnsContainerPropsSchema.shape.props.unwrap().unwrap().shape;

const ColumnsContainerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: z.string().nullish(),
      padding: z
        .object({
          top: z.number(),
          bottom: z.number(),
          left: z.number(),
          right: z.number(),
        })
        .optional()
        .nullable(),
      borderRadius: z.number().nullish(),
      borderColor: z.string().nullish(),
    })
    .optional()
    .nullable(),
  props: z
    .object({
      ...BasePropsShape,
      columns: z.tuple([
        z.object({ childrenIds: z.array(z.string()) }),
        z.object({ childrenIds: z.array(z.string()) }),
        z.object({ childrenIds: z.array(z.string()) }),
      ]),
    })
    .optional()
    .nullable(),
});

export type ColumnsContainerProps = z.infer<typeof ColumnsContainerPropsSchema>;
export default ColumnsContainerPropsSchema;
