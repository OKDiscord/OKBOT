import {
  required as _vRequired,
  minLength as _vMinLength,
} from "@vuelidate/validators"
import { unref } from "../utils"

const minLength: typeof _vMinLength = (length = 1) => {
  const _length = unref(length)

  return {
    $validator: val => typeof val === "string" && val.trim().length >= _length,
    $message: _vMinLength(length).$message,
    $params: { length: _length },
  }
}

const required: typeof _vRequired = {
  $validator: _vMinLength(1).$validator,
  $message: _vRequired.$message,
}

export { required, minLength }

// Export all Vuelidate validators so no additional imports
// are needed later.
export * from "@vuelidate/validators"
