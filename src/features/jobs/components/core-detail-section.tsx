import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const CoreDetailSection = () => {
  const { control, formState } = useFormContext();

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Core Application Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full gap-4 mb-4">
          <FormField
            control={control}
            name="company"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel className="inline-flex items-center gap-1">
                  <span>Company</span>
                  <span className="text-destructive text-lg leading-none align-middle">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Company"
                    type="text"
                    disabled={formState.isSubmitting}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel className="inline-flex items-center gap-1">
                  <span>Position</span>
                  <span className="text-destructive text-lg leading-none align-middle">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Postion"
                    type="text"
                    disabled={formState.isSubmitting}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input
                  placeholder="Source"
                  type="text"
                  disabled={formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default CoreDetailSection;
