import {
  CXDiagnosticDisplayOptionsT,
  CXDiagnosticSetT,
  CXDiagnosticT,
  CXLoadDiag_ErrorT,
  CXSourceLocation,
  CXSourceRange,
  CXString,
} from "./typeDefinitions.ts";

/**
 * Diagnostic reporting
 */

/**
 * Determine the number of diagnostics in a CXDiagnosticSet.
 */
export const clang_getNumDiagnosticsInSet = {
  parameters: [CXDiagnosticSetT],
  result: "u32",
} as const;

/**
 * Retrieve a diagnostic associated with the given CXDiagnosticSet.
 *
 * @param Diags the CXDiagnosticSet to query.
 * @param Index the zero-based diagnostic number to retrieve.
 *
 * @returns the requested diagnostic. This diagnostic must be freed
 * via a call to `clang_disposeDiagnostic()`.
 */
export const clang_getDiagnosticInSet = {
  parameters: [CXDiagnosticSetT, "u32"],
  result: CXDiagnosticT,
} as const;

/**
 * Deserialize a set of diagnostics from a Clang diagnostics bitcode
 * file.
 *
 * @param {const char *} file The name of the file to deserialize.
 * @param {CXLoadDiag_Error} error A pointer to a enum value recording if there was a problem
 *        deserializing the diagnostics.
 * @param {CXString *} errorString A pointer to a CXString for recording the error string
 *        if the file was not successfully loaded.
 *
 * @returns A loaded CXDiagnosticSet if successful, and NULL otherwise.  These
 * diagnostics should be released using clang_disposeDiagnosticSet().
 */
export const clang_loadDiagnostics = {
  parameters: [
    "buffer",
    CXLoadDiag_ErrorT,
    CXString,
  ],
  result: CXDiagnosticSetT,
} as const;

/**
 * Release a CXDiagnosticSet and all of its contained diagnostics.
 */
export const clang_disposeDiagnosticSet = {
  parameters: [CXDiagnosticSetT],
  result: "void",
} as const;

/**
 * Retrieve the child diagnostics of a CXDiagnostic.
 *
 * This CXDiagnosticSet does not need to be released by
 * clang_disposeDiagnosticSet.
 */
export const clang_getChildDiagnostics = {
  parameters: [CXDiagnosticT],
  result: CXDiagnosticSetT,
} as const;

/**
 * Destroy a diagnostic.
 */
export const clang_disposeDiagnostic = {
  parameters: [CXDiagnosticT],
  result: "void",
} as const;

/**
 * Format the given diagnostic in a manner that is suitable for display.
 *
 * This routine will format the given diagnostic to a string, rendering
 * the diagnostic according to the various options given. The
 * `clang_defaultDiagnosticDisplayOptions`() function returns the set of
 * options that most closely mimics the behavior of the clang compiler.
 *
 * @param Diagnostic The diagnostic to print.
 *
 * @param Options A set of options that control the diagnostic display,
 * created by combining {@link CXDiagnosticDisplayOptions} values.
 *
 * @returns A new string containing for formatted diagnostic.
 */
export const clang_formatDiagnostic = {
  parameters: [CXDiagnosticT, CXDiagnosticDisplayOptionsT],
  result: CXString,
} as const;

/**
 * Retrieve the set of display options most similar to the
 * default behavior of the clang compiler.
 *
 * @returns A set of display options suitable for use with {@link clang_formatDiagnostic}().
 */
export const clang_defaultDiagnosticDisplayOptions = {
  parameters: [],
  result: CXDiagnosticDisplayOptionsT,
} as const;

/**
 * Determine the severity of the given diagnostic.
 *
 * @returns {CXDiagnosticSeverity}
 */
export const clang_getDiagnosticSeverity = {
  parameters: [CXDiagnosticT],
  result: CXDiagnosticSetT,
} as const;

/**
 * Retrieve the source location of the given diagnostic.
 *
 * This location is where Clang would print the caret ('^') when
 * displaying the diagnostic on the command line.
 */
export const clang_getDiagnosticLocation = {
  parameters: [CXDiagnosticT],
  result: CXSourceLocation,
} as const;

/**
 * Retrieve the text of the given diagnostic.
 */
export const clang_getDiagnosticSpelling = {
  parameters: [CXDiagnosticT],
  result: CXString,
} as const;

/**
 * Retrieve the name of the command-line option that enabled this
 * diagnostic.
 *
 * @param Diag The diagnostic to be queried.
 *
 * @param {CXString *} Disable If non-NULL, will be set to the option that disables this
 * diagnostic (if any).
 *
 * @returns A string that contains the command-line option used to enable this
 * warning, such as "-Wconversion" or "-pedantic".
 */
export const clang_getDiagnosticOption = {
  parameters: [CXDiagnosticT, CXString],
  result: CXString,
} as const;

/**
 * Retrieve the category number for this diagnostic.
 *
 * Diagnostics can be categorized into groups along with other, related
 * diagnostics (e.g., diagnostics under the same warning flag). This routine
 * retrieves the category number for the given diagnostic.
 *
 * @returns The number of the category that contains this diagnostic, or zero
 * if this diagnostic is uncategorized.
 */
export const clang_getDiagnosticCategory = {
  parameters: [CXDiagnosticT],
  result: "u32",
} as const;

/**
 * Retrieve the name of a particular diagnostic category.  This
 *  is now deprecated.  Use clang_getDiagnosticCategoryText()
 *  instead.
 *
 * @param Category A diagnostic category number, as returned by
 * `clang_getDiagnosticCategory`().
 *
 * @returns The name of the given diagnostic category.
 */
export const clang_getDiagnosticCategoryName = {
  parameters: ["u32"],
  result: CXString,
} as const;

/**
 * Retrieve the diagnostic category text for a given diagnostic.
 *
 * @returns The text of the given diagnostic category.
 */
export const clang_getDiagnosticCategoryText = {
  parameters: [CXDiagnosticT],
  result: CXString,
} as const;

/**
 * Determine the number of source ranges associated with the given
 * diagnostic.
 */
export const clang_getDiagnosticNumRanges = {
  parameters: [CXDiagnosticT],
  result: "u32",
} as const;

/**
 * Retrieve a source range associated with the diagnostic.
 *
 * A diagnostic's source ranges highlight important elements in the source
 * code. On the command line, Clang displays source ranges by
 * underlining them with '~' characters.
 *
 * @param Diagnostic the diagnostic whose range is being extracted.
 *
 * @param Range the zero-based index specifying which range to
 *
 * @returns the requested source range.
 */
export const clang_getDiagnosticRange = {
  parameters: [CXDiagnosticT, "u32"],
  result: CXSourceRange,
} as const;

/**
 * Determine the number of fix-it hints associated with the
 * given diagnostic.
 *
 * @param Diangostic
 */
export const clang_getDiagnosticNumFixIts = {
  parameters: [CXDiagnosticT],
  result: "u32",
} as const;

/**
 * Retrieve the replacement information for a given fix-it.
 *
 * Fix-its are described in terms of a source range whose contents
 * should be replaced by a string. This approach generalizes over
 * three kinds of operations: removal of source code (the range covers
 * the code to be removed and the replacement string is empty),
 * replacement of source code (the range covers the code to be
 * replaced and the replacement string provides the new code), and
 * insertion (both the start and end of the range point at the
 * insertion location, and the replacement string provides the text to
 * insert).
 *
 * @param Diagnostic The diagnostic whose fix-its are being queried.
 *
 * @param FixIt The zero-based index of the fix-it.
 *
 * @param {CXSourceRange *} ReplacementRange The source range whose contents will be
 * replaced with the returned replacement string. Note that source
 * ranges are half-open ranges [a, b), so the source code should be
 * replaced from a and up to (but not including) b.
 *
 * @returns A string containing text that should be replace the source
 * code indicated by the `ReplacementRange`.
 */
export const clang_getDiagnosticFixIt = {
  parameters: [
    CXDiagnosticT,
    "u32",
    CXSourceRange,
  ],
  result: CXString,
} as const;
