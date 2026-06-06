import React from 'react'
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"


const AuthToggle = () => {
  return (
     <ToggleGroup
      type="single"
      size="sm"
      defaultValue="top"
      variant="outline"
      spacing={2}
    >
      <ToggleGroupItem value="top" aria-label="Toggle top">
        Student
      </ToggleGroupItem>
      <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
        Employer
      </ToggleGroupItem>
      <ToggleGroupItem value="left" aria-label="Toggle left">
        Admin
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Toggle right">
        University
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export default AuthToggle




