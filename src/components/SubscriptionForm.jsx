import React from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const SubscriptionForm = () => {
  return (
    <div>
      <Field>
        <FieldLabel htmlFor="input-button-group">Subscribe</FieldLabel>
        <ButtonGroup>
          <Input id="input-button-group" placeholder="Enter your email..." />
          <FieldDescription>
            Subscribe to our newsletter to receive updates of your preferences.
          </FieldDescription>
          <Button variant="outline">Subscribe</Button>
        </ButtonGroup>
      </Field>
    </div>
  );
};

export default SubscriptionForm;
