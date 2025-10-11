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

const AdditionalInfoSection = () => {
  const { control, formState } = useFormContext();

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Core Application Details</CardTitle>
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
        <div className="flex w-full gap-4 mt-4">
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
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoSection;
