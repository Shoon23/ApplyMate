import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const AdditionalInfoSection = () => {
  const { control, formState } = useFormContext();

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Additonal Information Section</CardTitle>
      </CardHeader>
      <CardContent className="gap-10">
        <FormField
          control={control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input
                  placeholder="Salary"
                  type="number"
                  disabled={formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-4 my-4">
          <FormField
            control={control}
            name="contactName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contact name"
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
            name="contactEmail"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contact Email"
                    type="email"
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
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  className="h-32 resize-none"
                  placeholder="Description"
                  disabled={formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add Job Description to generate Job Fit Score.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoSection;
